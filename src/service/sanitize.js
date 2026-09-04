import xss from "xss";
export function sanitize(value){
return xss(value);
}