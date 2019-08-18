import * as React from 'react'
import { IFFLabel, IFFRecord } from '../../../main/iffStore'
import { List } from '@material-ui/core'
import Target from '../../assets/target.svg'
import Neutral from '../../assets/neutral.svg'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Favorite from '@material-ui/icons/Favorite'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

interface IFFProps {
  iff: IFFRecord[]
  add: (record: IFFRecord) => void
  del: (name: string) => void
}

interface IFFListItemProps {
  iff: IFFRecord
}

const IffListItem = ({ iff }: IFFListItemProps) => (
  <ListItem component="div">
    <ListItemIcon>
      {(iff.label === IFFLabel.ally && <Favorite />) || (iff.label === IFFLabel.enemy && <Target />) || <Neutral />}
    </ListItemIcon>
    <ListItemText primary={iff.name} secondary={iff.notes} />
  </ListItem>
)

const Iff = ({ iff, add, del }: IFFProps) => (
  <div>
    <List component="div">
      {iff.map(record => (
        <IffListItem key={iff.name} iff={record} />
      ))}
    </List>
    <Button onClick={() => add({ name: 'Veldrin Hedgehog', notes: 'Me!', label: IFFLabel.ally })}>Add</Button>
  </div>
)

export default Iff
