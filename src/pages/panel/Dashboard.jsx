import React from 'react'
import { Card, Col, Row } from 'antd';
import { BulbOutlined, DollarCircleOutlined,TeamOutlined,MedicineBoxOutlined } from '@ant-design/icons';
const Dashboard = () => {
    return (
        <div className="site-card-wrapper">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card type="inner" title="Pacientes registrados" bordered={false} extra={<TeamOutlined />}>
                        Card content
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card type="inner" title="Pacientes atendidos" bordered={false} extra={<MedicineBoxOutlined />}>
                        Card content
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card type="inner" title="Atenciones del mes" bordered={false} extra={<BulbOutlined />}>
                        Card content
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card type="inner" title="Ganancias del mes" bordered={false} extra={<DollarCircleOutlined />}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard