
export interface Credentials {
  user: string
  password: string
}

export interface DataContext {
  signedUp: boolean
  setSignedUp: (_value: boolean) => void
}

export interface Employee {
  birthday: number
  id: number
  last_name: string
  name: string
}

export interface FileInputData {
  fileName: string
  data: any
}
