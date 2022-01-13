import React from 'react'
import { Modal } from 'antd';

const ModalCustomComp = ({
    renderContent,
    isModalVisible,
    handleCancel = () => { },
    handleOk = () => { },
    title = ""
}) => {
    return (
        <Modal
            title={title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
            {renderContent()}
        </Modal>
    )
}

export const ModalCustom = React.memo(ModalCustomComp)
