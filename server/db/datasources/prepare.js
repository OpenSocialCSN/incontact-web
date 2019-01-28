export default function prepare(o) {
  o._id = o._id.toString();
  return o;
}
