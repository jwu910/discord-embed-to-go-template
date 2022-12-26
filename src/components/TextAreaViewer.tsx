import TextareaAutosize from "@mui/base/TextareaAutosize";

interface IProps {
  id: string;
}

const TextAreaViewer = (props: IProps) => {
  return (
    <TextareaAutosize
      className="text-area-viewer"
      minRows="100"
      id={props.id}
    ></TextareaAutosize>
  );
};

export default TextAreaViewer;
