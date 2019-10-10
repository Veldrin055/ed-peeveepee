class Server {
  private ws!: WebSocket
  subscriptions: Map<string, (data: any) => void>
  private buffer: any[]
  private ready: boolean

  constructor() {
    this.ready = false
    this.buffer = []
    this.subscriptions = new Map()
    this.connect()
  }

  // Send the data if connection is open, otherwise add it to the buffer
  send(data: any) {
    if (this.ready) {
      this.ws.send(JSON.stringify(data))
    } else {
      this.buffer.push(data)
    }
  }

  // Subscribe to messages for a given type
  onmessage(type: string, callback: (data: any) => void) {
    this.subscriptions.set(type, callback)
  }

  removeListener(type: string) {
    this.subscriptions.delete(type)
  }

  connect() {
    this.ready = false
    this.ws = new WebSocket('ws://ed-pvp-server.herokuapp.com')

    this.ws.onopen = () => {
      // flush the buffer and set ready
      for (let i = 0; i < this.buffer.length; i += 1) {
        this.ws.send(JSON.stringify(this.buffer.shift()))
      }
      this.ready = true
    }

    this.ws.onclose = e => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
      setTimeout(() => this.connect(), 1000)
    }

    this.ws.onmessage = ({ data }) => {
      const { type, msg } = JSON.parse(data)

      const sub = this.subscriptions.get(type)
      if (sub) {
        sub(msg)
      }
    }
  }
}

export default Server
