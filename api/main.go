package main

import (
	"encoding/json"
	"fmt"
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
	Date  string   `json:"date"`
	Times []string `json:"times"`
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	app.Get("/create/:id", func(c *fiber.Ctx) error {
		_, err := os.Stat(fmt.Sprintf("%s.json", c.Params("id")))
		if os.IsNotExist(err) {
			return c.SendStatus(200)
		}
		return c.SendStatus(400)
	})

	app.Post("/create", func(c *fiber.Ctx) error {
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

	app.Get("/get/:id", func(c *fiber.Ctx) error {
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

	app.Post("/update/:id/:participant", func(c *fiber.Ctx) error {
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

		var requestBody Mura

		err = json.Unmarshal(c.Body(), &requestBody)
		if err != nil {
			return err
		}

		for i, participant := range mura.Participants {
			if participant.Name == c.Params("participant") {
				mura.Participants[i].Availability = requestBody.Participants[0].Availability
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
