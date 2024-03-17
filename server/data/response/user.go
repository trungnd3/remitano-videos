package response

type User struct {
	Id				int			`json:"id"`
	Username	string	`json:"username"`
	Token			string	`json:"token"`
}