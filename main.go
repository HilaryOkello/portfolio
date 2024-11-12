package main

import (
	"log"
	"net/http"
	"text/template"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		log.Printf("Method not allowed")
		return
	}
	templ, err := template.ParseFiles("templates/index.html")
	if err != nil {
		log.Printf("Error Parsing Template")
		return
	}
	templ.Execute(w, nil)
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", homeHandler)
	log.Println("Success. Server listening on port 8000")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Println("Failed to start server")
	}
	
}
