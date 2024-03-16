package response

type Api struct {
	Code		int					`json:"code"`
	Status	string			`json:"status"`
	Data		interface{}	`json:"data,omitempty"`
}