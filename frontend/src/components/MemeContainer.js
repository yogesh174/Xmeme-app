import "./MemeContainer.css";

function MemeContainer(props) {
  const name = props.name;
  const url = props.url;
  const caption = props.caption;
  return (
    <div className="container">
      <div className="name">{name}</div>
      <div className="caption">{caption}</div>
      <img className="image" src={url} alt="Image" />
    </div>
  );
}
export default MemeContainer;
