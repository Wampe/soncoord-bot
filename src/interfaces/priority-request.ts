import { Timestamp } from 'firebase/firestore';
import { ChannelBase } from './channel-base';

export interface PriorityRequest extends ChannelBase {
    added: Timestamp
}
