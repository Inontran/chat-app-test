import Pusher from 'pusher-js';

const ADD_NEW_MSG = 'ADD_NEW_MSG';
const TOGGLE_APP_PRELOADER = 'TOGGLE_APP_PRELOADER';

const initialState = {
  showAppPreloder: false,
  newIncomingMsg: new Map<string, Map<number, TgUserMessage>>(),
};

const test = new Map<number, TgUserMessage>();
test.set(111, {
  id: 111,
  time: Date.now(),
  type: 'message',
  fromUser: {
    name: '',
  },
  chat: {
    id: 'channel-1020195196h-2382150705436123364',
    image: '',
    name: 'Roskomsvoboda',
  },
  message: {
    text:'1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde laudantium dicta ipsa tenetur nobis, aperiam eveniet dolores quo ducimus dolorem cumque reprehenderit distinctio. Eligendi fuga qui aperiam praesentium exercitationem sunt?',
    caption: '',
  },
});
test.set(222, {
  id: 222,
  time: Date.now(),
  type: 'message',
  fromUser: {
    name: '',
  },
  chat: {
    id: 'channel-1020195196h-2382150705436123364',
    image: '',
    name: 'Roskomsvoboda',
  },
  message: {
    text:'2 Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    caption: '',
  },
});
test.set(333, {
  id: 333,
  time: Date.now(),
  type: 'message',
  fromUser: {
    name: '',
  },
  chat: {
    id: 'channel-1020195196h-2382150705436123364',
    image: '',
    name: 'Roskomsvoboda',
  },
  message: {
    text:'3 Lorem ipsum dolor',
    caption: '',
  },
});
test.set(444, {
  id: 444,
  time: Date.now(),
  type: 'message',
  fromUser: {
    name: '',
  },
  chat: {
    id: 'channel-1020195196h-2382150705436123364',
    image: '',
    name: 'Roskomsvoboda',
  },
  message: {
    text:'4 test',
    caption: '',
  },
});
test.set(555, {
  id: 555,
  time: Date.now(),
  type: 'message',
  fromUser: {
    name: '',
  },
  chat: {
    id: 'channel-1020195196h-2382150705436123364',
    image: '',
    name: 'Roskomsvoboda',
  },
  message: {
    text:'5 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde laudantium dicta ipsa tenetur nobis',
    caption: '',
  },
});
initialState.newIncomingMsg.set('channel-1020195196h-2382150705436123364', test);

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NEW_MSG:
      const incomingMsg = new Map<string, Map<number, TgUserMessage>>(state.newIncomingMsg);
      for(let msgItem of action.newMessages.payload.data) {
        if (!incomingMsg.has(msgItem.chat.id)) {
          incomingMsg.set(msgItem.chat.id, new Map<number, TgUserMessage>());
        }
        const currentChatMap = incomingMsg.get(msgItem.chat.id);
        currentChatMap?.set(msgItem.id, msgItem);
      }

      return {
        ...state,
        newIncomingMsg: incomingMsg,
      }
      break;

    case TOGGLE_APP_PRELOADER:
      return {
        ...state,
        showAppPreloder: action.showAppPreloder,
      }
      break;
  
    default:
      break;
  }

  return state;
}

const addNewMsgAC = (data: TgBroadcastMsg) => {
  return {
    type: ADD_NEW_MSG,
    newMessages: data,
  }
}


const toggleAppPreloderAC = (showAppPreloder: boolean) => {
  return {
    type: TOGGLE_APP_PRELOADER,
    showAppPreloder: showAppPreloder,
  }
};

let pusher: Pusher | null = null;

const startPusherNewMsgTC = (accessToken: string) => (dispatch: Function) => {
  if (pusher !== null) {
    pusher.disconnect();
  }
  
  pusher = new Pusher('ChatsAppApiProdKey', {
    wsHost: 'api.chatapp.online',
    wssPort: 6001,
    disableStats: true,
    authEndpoint: 'https://api.chatapp.online/broadcasting/auth',
    auth: {
      headers: {
        'Authorization': accessToken,
      }
    },
    enabledTransports: ['ws'],
    forceTLS: true
  });

  const channel = pusher.subscribe('private-v1.licenses.18274.messengers.telegram');

  channel.bind('message', (data: TgBroadcastMsg) => {
    dispatch(addNewMsgAC(data));
  });
}

export {
  startPusherNewMsgTC,
  toggleAppPreloderAC,
}

export default appReducer;
