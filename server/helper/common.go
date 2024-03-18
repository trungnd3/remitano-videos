package helper

func Index(s []int, v int) int {
	for i, vs := range s {
		if vs == v {
			return i
		}
	}

	return -1
}