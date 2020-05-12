from http.server import HTTPServer, BaseHTTPRequestHandler


class Based(BaseHTTPRequestHandler):

    """
    Your task is to define this class such that it fulfills the assingment
    requirements.

    Refer to the official Python documentation for the `http.server` class for
    details on what can go in here.
    """
    def redir301(self, location=""):
        # You shouldn't actually send your headers like this
        # This is *way* too much work.  Read the http.server documentation on python.org
        # to learn the right way to do this.

        print(f"You got redirected to {location}")

# this can't be the efficient way to do this either......
        self.send_header(f"Location: {location}")
        self.send_header("Content-Type:" "text/html")
        self.send_header("Connection: Close")
        self.send_header("Cache-Control: max-age=1")
        self.send_header(f"Content-Length: {len(self.path)}")

        # self.wfile.write(b"HTTP/1.0 301 Moved Permanently\n")
        # self.wfile.write(b"Server: Sal's cool server\n")
        # self.wfile.write(b"Content-Type: text/html;\n")
        # self.wfile.write(b"Connection: close\n")
        # self.wfile.write(bytes(f"Location: {location}\n", "utf-8"))
        # self.wfile.write(b"\n\n")

    def do_GET(self):

        if self.path == '/':
            self.path = '/index.html'
        try:
            fileToOpen = open(self.path[1:]).read()
            self.send_response(200)
        except:
            fileToOpen = "File not found"
            self.send_response(404)

        if self.path == '/about':
            self.path +='.html'
        try: fileToOpen = open(self.path[1:]).read()
        except:
            fileToOpen = "File not  found"
            self.send_response(404)

        if self.path.startswith('/tips'):
            self.path = '/tips.html'
        try: fileToOpen = open(self.path[1:]).read()
        except:
            fileToOpen = "File not found"
            self.send_response(404)

        if self.path.endswith('/help'):
            self.send_response(301, "Moved Permanently")
            new_path = ('http://localhost:8000/tips.html')
            self.redir301(new_path)
            self.send_header("Location:", new_path)

        if self.path.startswith('/bio'):
            self.send_response(301, "Moved Permanently")
            new_path = ('http://localhost:8000/about.html')
            self.redir301(new_path)
            self.send_header("Location:", new_path)
            self.send_header("MimeType:", ".html")

        if self.path.startswith('/favicon.ico'):
            self.path = '/favicon.ico'
        try: fileToOpen = open(self.path[1:]).read()
        except:
            fileToOpen = "File not found"
            self.send_response(404)

        if self.path == "/debugging":
            fileToOpen = ("Server version: ")
           #  + self.server_version + "\n" +
           # "Current Date/Time: " + self.date_time_string() + "\n" +
           # "Client IP address/Port Number: " + self.client_address.toString + "\n" +
           # "Path requested: " + self.path + "\n" +
           # "Request type: " + self.request + "\n" +
           # "HTTP version of request: " + self.request_version + "\n" +
           # "List of Headers: " + self.headers)

        if self.path =="/teapot":
            self.send_response(418)
        if self.path == "/area51":
            self.send_response(418)

        #favicon isn't working, teapot isn't working and I don't know how to best do headers....
        #also the debugging page doesn't let me write what I want....



        self.end_headers()
        self.wfile.write(bytes(fileToOpen, 'utf-8'))



if __name__ == '__main__':
    server_address = ('localhost', 8000)
    print(f"Serving from http://{server_address[0]}:{server_address[1]}")
    print("Press Ctrl-C to quit\n")
    HTTPServer(server_address, Based).serve_forever()