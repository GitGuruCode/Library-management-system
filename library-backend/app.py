# CRUD Operations and Borrow/Return Functionality for Books

from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Dhoni@0007'
app.config['MYSQL_DB'] = 'library'

mysql = MySQL(app)

# Route to add a new book
@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    title = data['title']
    author = data['author']
    publication_year = data['publication_year']
    availability_status = True

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO books (title, author, publication_year, availability_status) VALUES (%s, %s, %s, %s)", 
                (title, author, publication_year, availability_status))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Book added successfully"}), 201

# Route to get the list of all books
@app.route('/books', methods=['GET'])
def get_books():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM books")
    books = cur.fetchall()
    cur.close()

    books_list = []
    for book in books:
        books_list.append({
            "id": book[0],
            "title": book[1],
            "author": book[2],
            "publication_year": book[3],
            "availability_status": book[4]
        })

    return jsonify(books_list)

# Route to update a book's details
@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.json

    # Fetch the current details of the book
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM books WHERE id = %s", (book_id,))
    book = cur.fetchone()

    if not book:
        cur.close()
        return jsonify({"message": "Book not found"}), 404

    # Update only the provided fields
    title = data.get('title', book[1])
    author = data.get('author', book[2])
    publication_year = data.get('publication_year', book[3])
    availability_status = data.get('availability_status', book[4])

    cur.execute("""
        UPDATE books 
        SET title = %s, author = %s, publication_year = %s, availability_status = %s 
        WHERE id = %s
    """, (title, author, publication_year, availability_status, book_id))
    
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Book updated successfully"})


# Route to delete a book
@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM books WHERE id = %s", (book_id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Book deleted successfully"})

# Route to borrow a book
@app.route('/borrow', methods=['POST'])
def borrow_book():
    data = request.json
    book_id = data['book_id']
    user_id = data['user_id']

    cur = mysql.connection.cursor()
    cur.execute("SELECT availability_status FROM books WHERE id = %s", (book_id,))
    book = cur.fetchone()

    if book and book[0]:  # Check if the book is available
        cur.execute("INSERT INTO transactions (book_id, user_id, borrow_date) VALUES (%s, %s, NOW())", (book_id, user_id))
        cur.execute("UPDATE books SET availability_status = 0 WHERE id = %s", (book_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Book borrowed successfully"})
    else:
        cur.close()
        return jsonify({"message": "Book is not available"}), 400


# Route to return a book
@app.route('/return', methods=['POST'])
def return_book():
    data = request.json
    book_id = data['book_id']
    user_id = data['user_id']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM transactions WHERE book_id = %s AND user_id = %s AND return_date IS NULL", (book_id, user_id))
    transaction = cur.fetchone()

    if transaction:
        cur.execute("UPDATE transactions SET return_date = NOW() WHERE id = %s", (transaction[0],))
        cur.execute("UPDATE books SET availability_status = 1 WHERE id = %s", (book_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Book returned successfully"})
    else:
        cur.close()
        return jsonify({"message": "No active transaction found"}), 400


# Route to list books by availability
@app.route('/books/available', methods=['GET'])
def list_available_books():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM books WHERE availability_status = 1")
    books = cur.fetchall()
    cur.close()

    available_books = []
    for book in books:
        available_books.append({
            "id": book[0],
            "title": book[1],
            "author": book[2],
            "publication_year": book[3],
            "availability_status": bool(book[4])
        })

    return jsonify(available_books)


if __name__ == "__main__":
    app.run(debug=True,port=5000)
