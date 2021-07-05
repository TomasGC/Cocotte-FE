export function IsEmpty(e) {
  if (e === undefined || typeof(e) === undefined)
    return true;

  switch (e) {
    case "":
    case 0:
    case "0":
    case null:
    case e.length == 0:
      return true;
    default:
      return false;
  }
}
