import React from 'react'

export default function Keyboard() {
  return (
    <Keyboard  display={{
        '{enter}': '&#9166;',
        '{bksp}': '&larr;',
        '{tab}': 'tab',
        '{lock}': 'lock',
        '{shift}': 'shift',
        '{space}': '&#13;',
      }} theme={'hg-theme-default  typewriter-keyboard'}
      onKeyPress={keyboardPress}  
      onKeyReleased={keyboardRelease}        
      keyboardRef={r => keyboardRef.current = r}
      physicalKeyboardHighlight={true}
      physicalKeyboardHighlightBgColor={"#000000"}
      layout={{
        'default': [
          '1 2 3 4 5 6 7 8 9 0 {bksp}',
          'q w e r t y u i o p',
          'a s d f g h j k l',
          '{shift} z x c v b n m',
          '{space} {enter}'
        ],
      }}
      buttonTheme={[
        {
          class: 'keys',
          buttons: "a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 {bksp} ; ' , . {shift}"
        },
        {
          class: "space-key",
          buttons: "{space}"
        },
        {
          class: "enter-key",
          buttons: "{enter}"
        }
      ]}
      ></Keyboard>
  )
}
