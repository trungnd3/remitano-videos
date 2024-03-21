package response

type Socket struct {
	Type				string	`json:"type"`
	Username		string 	`json:"username"`
	Video				Video		`json:"video"`
}