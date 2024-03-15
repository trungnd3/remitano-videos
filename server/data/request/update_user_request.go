package request

type UpdateUserRequest struct {
	Id		int	`validate:"required"`
}