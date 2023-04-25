import variables from '../constants/variables'

export default {}

export async function get_todos() {
  let loading = true
  let data: never[] = []
  let error: any

  return fetch(variables.api.root + variables.api.routes.todos.url, {
    method: variables.api.routes.todos.type,
    headers: {
      Accept: 'application/json, text/json',
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText)
        throw error
      }

      return res.json()
    })
    .then((json) => {
      data = json
    })
    .catch((err) => {
      error = err
      if (err.json) {
        return err.json.then((json: { message: any }) => {
          error.message = json.message
        })
      }
    })
    .then(() => {
      loading = false
      return { loading: loading, data: data, error: error }
    })
}
