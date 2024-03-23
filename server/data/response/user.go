package response

type User struct {
	Id							int			`json:"id"`
	Token						string	`json:"token"`
	TokenExpiresAt	int64		`json:"tokenExpiresAt"`
}