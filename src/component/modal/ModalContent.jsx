import { Dialog } from "primereact/dialog"
import parse from "html-react-parser"

export default function ModalContent({ visible, setVisible, detailContent }) {
    return (
        <div className="card flex justify-content-center">
            <Dialog
                header={detailContent?.title}
                visible={visible}
                style={{ width: "100vw", maxHeight: "100%" }}
                onHide={() => setVisible(false)}
                className="dialog-readonly"
            >
                <div className="px-20">
                    {parse(detailContent?.content || "")}
                </div>
                {/* <Button className="float-right !mt-2" size="small">
                    Bài tiếp theo
                </Button> */}
            </Dialog>
        </div>
    )
}
