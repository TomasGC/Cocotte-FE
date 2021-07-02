export function IsEmpty(e) {
  switch (e) {
    case "":
    case 0:
    case "0":
    case null:
    case typeof(e) == "undefined":
    case e.length == 0:
      return true;
    default:
      return false;
  }
}
