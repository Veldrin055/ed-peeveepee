import { Location } from '../../common/types'

export const locationDisplay = ({ starSystem, body }: Location) =>
  starSystem !== body ? `${starSystem} / ${body}` : `${starSystem}`
