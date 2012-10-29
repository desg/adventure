package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
)

type Story struct {
	Title       string
	Description string
	Questions   []Question
}

func (s *Story) GetQuestion(id string) (*Question, error) {
	for _, question := range s.Questions {
		if question.Id == id {
			return &question, nil
		}
	}

	return nil, errors.New("Question ID not found")
}

type Question struct {
	Id      string
	Query   string
	Choices []Choice
}

type Choice struct {
	Name           string
	Event          string
	Destination    string
	CivilianLoss   int
	MilitaryLoss   int
	MothershipLoss bool
	Chosen         bool
}

func loadStory(filename string) (*Story, error) {
	story := &Story{}

	// Read from file
	data, readError := ioutil.ReadFile(filename)
	if readError != nil {
		return nil, readError
	}

	// Construct story
	jsonError := json.Unmarshal(data, &story)
	if jsonError != nil {
		return nil, jsonError
	}

	return story, nil
}

func main() {
	story := &Story{}
	question := &Question{}
	choice := &Choice{}

	response := 0
	storyfile := ""

	fmt.Println("Load story file:")
	fmt.Scanln(&storyfile)

	story, err := loadStory("stories/" + storyfile + ".json")
	if err != nil {
		fmt.Println("Error loading story:", err)
		os.Exit(0)
	}

	// Print title
	fmt.Println(story.Title)
	fmt.Println("- - - - - - - - - - - -")

	question, err = story.GetQuestion("root")
	if err != nil {
		fmt.Println("Error. No initial question found")
		os.Exit(0)
	}

	for {
		// Ask Question
		fmt.Println(question.Query)

		// Print choices
		for k, v := range question.Choices {
			if v.Chosen {
				continue
			}
			fmt.Printf("%v: %v\n", k, v.Name)
		}

		// Wait for input
		fmt.Scanln(&response)

		// Fetch answer based on input
		choice = &question.Choices[response]
		choice.Chosen = true

		// Print answer event
		fmt.Println(choice.Event)

		// Recurse if no "LeadsTo"
		if choice.Destination == "" {
			continue
		}

		// Find next question
		question, err = story.GetQuestion(choice.Destination)
		if err != nil {
			fmt.Println(err)
			break
		}
	}
}
