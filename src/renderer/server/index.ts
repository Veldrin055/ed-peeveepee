class Server {
  ws: WebSocket
  subscriptions: Map<string, (data: any) => void>

  constructor() {
    // this.ws = new WebSocket('ws://ed-pvp-server.herokuapp.com')
    this.ws = new WebSocket('ws://localhost:3000')
    this.subscriptions = new Map()
    this.ws.onmessage = ({ data }) => {
      console.log('message received', data)
      const { type, msg } = JSON.parse(data)
      const sub = this.subscriptions.get(type)
      if (sub) {
        sub(msg)
      }
    }
  }

  send(data: any) {
    console.log('sending', data)
    return new Promise(async (resolve, reject) => {
      let attempts = 3
      while (this.ws.readyState !== this.ws.OPEN) {
        attempts = attempts - 1
        if (attempts === 0) {
          reject('Server connection timed out')
        }
        await setTimeout(50)
      }
      this.ws.send(JSON.stringify(data))
      resolve()
    })
  }

  onmessage(type: string, callback: (data: any) => void) {
    this.subscriptions.set(type, callback)
  }
}

export default Server
