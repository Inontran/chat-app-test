import React from 'react';
import { connect } from 'react-redux';

import { loginTC } from './redux/reducers/auth-reducer/auth-reducer';
import { startPusherNewMsgTC } from './redux/reducers/app-reducer/app-reducer';
import MessageCard from './components/MessageCard/MessageCard';
import Preloader from './components/Preloader/Preloader';
import Login from './components/Login/Login';

import styles from './App.module.scss';

interface AppProps {
  isAuth: boolean,
  accessToken: string | null,
  login: Function,
  startPusherNewMsg: Function,
  messages: Map<string, Map<number, TgUserMessage>>,
  showPreloader: boolean,
}

class App extends React.Component<AppProps> {
  render () {
    if (!this.props.isAuth) {
      return <>
        <Login
          login = { this.props.login }
        />
        {
          this.props.showPreloader && <Preloader/>
        }
      </>
    }

    return (
      <div className = { styles.App }>
        <section className = { styles.MessageListWrapper }>
          {
            App.convertMapToArray(this.props.messages).map((chat) => {
              return <div 
                className = { styles.MessageList }
                key = { chat[0].chat.id }
                style = {{ paddingBottom: ((chat.length-1) * 10) + 'px' }}
              >
                {
                  chat.map((messageItem, index) => {
                    return <div
                      className = { styles.MessageCardWrapper }
                      key = { messageItem.id }
                      style = {{bottom: ((index * 10)) + 'px' }}
                    >
                      <MessageCard
                        time = { messageItem.time }
                        chatName = { messageItem.chat.name }
                        name = { messageItem.fromUser.name }
                        text = { messageItem.message.text || messageItem.message.caption }
                      />
                    </div>
                  })
                }
              </div>
            })
          }
        </section>
      </div>
    );
  }

  shouldComponentUpdate (nextProps: AppProps, nextState: any) {
    if (nextProps.accessToken !== this.props.accessToken && nextProps.accessToken) {
      this.props.startPusherNewMsg(nextProps.accessToken);
    }

    const isChangedPropState = nextProps !== this.props || nextState !== this.state;
    return isChangedPropState;
  }

  static convertMapToArray(chats: Map<string, Map<number, TgUserMessage>>): TgUserMessage[][] {
    const arrMsgPerChat: TgUserMessage[][] = [];
    for(let chat of chats.values()) {
      const arrMsg = [];
      for(let message of chat.values()) {
        arrMsg.push(message);
      }

      if (arrMsg.length > 4) {
        arrMsgPerChat.push(arrMsg.slice(arrMsg.length - 4));
      } else {
        arrMsgPerChat.push(arrMsg);
      }
    }

    return arrMsgPerChat.reverse();
  }
}

const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
  accessToken: state.auth.accessToken,
  messages: state.app.newIncomingMsg,
  showPreloader: state.app.showAppPreloder,
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (email: string, password: string) => {
      dispatch(loginTC(email, password));
    },
    startPusherNewMsg: (accessToken: string) => {
      dispatch(startPusherNewMsgTC(accessToken));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
