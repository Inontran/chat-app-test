import React from 'react';
import moment from 'moment';

import telegramIcon from '../../share/icons/telegram.svg';

import MessageCardProps from './MessageCardProps';
import styles from './MessageCard.module.scss';

moment.lang('ru');

const MessageCard = ({
  time,
  chatName,
  name,
  text,
  ...props
}: MessageCardProps) => {

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return moment(date).format('HH:mm');
  }

  const truncate = (str: string, maxLength: number): string => {
    if (str.length && str.length > maxLength) {
      return str.substring(0, maxLength) + '…';
    }
    return str;
  }

  return (
    <article className = { styles.MessageCard }>
      <header className = { styles.Header }>
        <img
          className = { styles.MessangerIcon }
          src = {telegramIcon}
          alt = 'tg'
        />
        <span className = { styles.MessangerType }>Telegram</span>
        <time
          className = { styles.Time }
          dateTime = { time.toString() }
        >{formatDate(time)}</time>
      </header>

      <div className = { styles.ChatName }>{chatName}</div>

      <div className = { styles.Text }>
        {
          (name && name !== chatName) && <span className = { styles.Name }>{name}: </span>
        }
        {truncate(text, 100)}
      </div>
    </article>
  );
}

export default MessageCard;