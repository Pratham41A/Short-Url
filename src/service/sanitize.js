import xss from "xss";

export function sanitize(input){
return xss(input);
}