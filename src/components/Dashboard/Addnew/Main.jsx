import { useState } from "react";
import IncomeTax from "../IncomeTax";
import ROC from "../ROC";

const Main = ({ activeModule }) => {
    const [activeModal, setActiveModal] = useState(false);

    const handleOpenModal = () => setActiveModal(true);
    const handleCloseModal = () => setActiveModal(false);

    const renderForm = () => {
        switch (activeModule) {
            case "income-tax":
                return <IncomeTax onClose={handleCloseModal} />;
            case "roc":
                return <ROC onClose={handleCloseModal} />;
            // Add more cases as needed
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex space-x-4">
                <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add New
                </button>
            </div>
            {activeModal && renderForm()}
        </div>
    );
};

export default Main;
