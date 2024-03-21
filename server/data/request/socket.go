package request

type Socket struct {
	Auth	struct {
		Token		string `json:"token"`
	}	`json:"auth"`
	Query struct {
		Type		string	`json:"type"`
		VideoId	int			`json:"videoId"`
	}	`json:"query"`
}