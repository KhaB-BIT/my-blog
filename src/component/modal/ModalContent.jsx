import { Dialog } from "primereact/dialog"
// import { Editor } from "primereact/editor"
import { Button } from "primereact/button"
import parse from "html-react-parser"

export default function ModalContent({ visible, setVisible, detailContent }) {
    // const newContent = detailContent?.content.replaceAll(
    //     "<p>",
    //     '<p style="font-size: 16px;">'
    // )
    return (
        <div className="card flex justify-content-center">
            <Dialog
                header={detailContent?.title}
                visible={visible}
                style={{ width: "100vw", maxHeight: "100%" }}
                onHide={() => setVisible(false)}
                className="dialog-readonly"
            >
                {/* <Editor
                    value={newContent}
                    readOnly
                    style={{ height: "100%" }}
                /> */}
                <div className="px-20">
                    {parse(detailContent?.content || "")}
                </div>
                <Button className="float-right !mt-2" size="small">
                    Bài tiếp theo
                </Button>
            </Dialog>
        </div>
    )
}
