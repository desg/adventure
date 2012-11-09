package server

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

type Story struct {
	Choices     []*Choice
	Description string
	Questions   []*Question
	Title       string
}

type Question struct {
	Choices []*Choice
	Id      string
	Query   string
}

type Choice struct {
	Event string
	From  string
	Name  string
	To    string
}

func NewStory(filename string) *Story {
	data := &Story{}

	f, err := ioutil.ReadFile(filename)
	if err != nil {
		// Throw an error, lol
	}

	json.Unmarshal(f, data)

	// Fill in some missing bits
	for _, question := range data.Questions {
		for _, choice := range question.Choices {
			data.Choices = append(data.Choices, choice)
			choice.From = question.Id
		}
	}

	return data
}

func init() {
	http.Handle("/", http.FileServer(http.Dir("public")))
	http.HandleFunc("/foo", foo)
}

func foo(w http.ResponseWriter, r *http.Request) {
	homeworld := NewStory("stories/homeworld.json")

	t, err := template.ParseFiles("templates/foo.html")
	if err != nil {
		fmt.Fprint(w, err)
	}
	t.Execute(w, homeworld)
}
