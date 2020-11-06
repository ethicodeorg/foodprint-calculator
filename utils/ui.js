/* setFocus function - focuses an element by react reference
- pass it a reference
var myInputName = useRef();
setFocus(myInputName)
*/
export function setFocus(ref){
    ref.current.focus();
}