package request

type CreateUser struct {
	Username	string	`validate:"required,min=1,max=200" json:"username"`
	Password	string	`validate:"required,min=1,max=20" json:"password"`
}

type UpdateUser struct {
	Id						int			`validate:"required" json:"id"`
	Token					string	`json:"token"`
	RefreshToken	string	`json:"refresh_token"`
}