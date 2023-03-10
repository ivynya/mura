package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Mura struct {
	MeetingName   string        `json:"meeting_name"`
	MeetingDesc   string        `json:"meeting_desc"`
	MeetingID     string        `json:"meeting_id"`
	MeetingHost   string        `json:"meeting_host"`
	MeetingLength int           `json:"meeting_length"`
	Type          string        `json:"type"`
	DateFrom      string        `json:"date_from"`
	DateTo        string        `json:"date_to"`
	TimeFrom      string        `json:"time_from"`
	TimeTo        string        `json:"time_to"`
	Participants  []Participant `json:"participants"`
}

type Participant struct {
	Name         string         `json:"name"`
	Availability []Availability `json:"availability"`
}

type Availability struct {
	Date  string `json:"date"`
	Times []int  `json:"times"`
}

func main() {
	app := fiber.New()
	api := app.Group("/mura")

	api.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	api.Get("/create/:id", func(c *fiber.Ctx) error {
		_, err := os.Stat(fmt.Sprintf("%s.json", c.Params("id")))
		if os.IsNotExist(err) {
			return c.SendStatus(200)
		}
		return c.SendStatus(400)
	})

	api.Post("/create", func(c *fiber.Ctx) error {
		var requestBody Mura

		err := json.Unmarshal(c.Body(), &requestBody)
		if err != nil {
			return err
		}

		// Write the request body to a JSON file with the name ID.json
		filename := fmt.Sprintf("%s.json", requestBody.MeetingID)
		file, err := os.Create(filename)
		if err != nil {
			return err
		}
		defer file.Close()

		encoded, err := json.MarshalIndent(requestBody, "", "  ")
		if err != nil {
			return err
		}

		_, err = file.Write(encoded)
		if err != nil {
			return err
		}

		return c.SendString(fmt.Sprintf("File %s created successfully", filename))
	})

	api.Get("/get/:id", func(c *fiber.Ctx) error {
		filename := fmt.Sprintf("%s.json", c.Params("id"))
		file, err := os.Open(filename)
		if err != nil {
			return err
		}
		defer file.Close()

		var mura Mura
		err = json.NewDecoder(file).Decode(&mura)
		if err != nil {
			return err
		}

		return c.JSON(mura)
	})

	api.Post("/create/:id/:participant", func(c *fiber.Ctx) error {
		filename := fmt.Sprintf("%s.json", c.Params("id"))
		file, err := os.Open(filename)
		if err != nil {
			log.Println("ERR: /create/:id/:participant @ os.Open")
			return err
		}
		defer file.Close()

		var mura Mura
		err = json.NewDecoder(file).Decode(&mura)
		if err != nil {
			log.Println("ERR: /create/:id/:participant @ json.NewDecoder")
			return err
		}

		var requestBody Participant

		err = json.Unmarshal(c.Body(), &requestBody)
		if err != nil {
			log.Println("ERR: /create/:id/:participant @ json.Unmarshal")
			return err
		}

		mura.Participants = append(mura.Participants, requestBody)

		encoded, err := json.MarshalIndent(mura, "", "  ")
		if err != nil {
			return err
		}

		err = os.WriteFile(filename, encoded, 0644)
		if err != nil {
			return err
		}

		return c.SendString(fmt.Sprintf("File %s updated successfully", filename))
	})

	api.Post("/update/:id/:participant", func(c *fiber.Ctx) error {
		filename := fmt.Sprintf("%s.json", c.Params("id"))
		file, err := os.Open(filename)
		if err != nil {
			log.Println("ERR: /update/:id/:participant @ os.Open")
			return err
		}
		defer file.Close()

		var mura Mura
		err = json.NewDecoder(file).Decode(&mura)
		if err != nil {
			log.Println("ERR: /update/:id/:participant @ json.NewDecoder")
			return err
		}

		var requestBody Participant

		err = json.Unmarshal(c.Body(), &requestBody)
		if err != nil {
			log.Println("ERR: /update/:id/:participant @ json.Unmarshal")
			return err
		}

		for i, participant := range mura.Participants {
			if participant.Name == c.Params("participant") {
				mura.Participants[i].Availability = requestBody.Availability
			}
		}

		encoded, err := json.MarshalIndent(mura, "", "  ")
		if err != nil {
			return err
		}

		err = os.WriteFile(filename, encoded, 0644)
		if err != nil {
			return err
		}

		return c.SendString(fmt.Sprintf("File %s updated successfully", filename))
	})

	app.Listen(":3000")
}
