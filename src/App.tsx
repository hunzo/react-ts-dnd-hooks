import React from 'react'
import DragNDrop from './components/DragNDrop'

const App: React.FC = () => {
    const data = [
        { title: 'group 1', items: ['1', '2', '3', '4'] },
        { title: 'group 2', items: ['5', '6', '7'] },
        { title: 'group 3', items: ['88', '99'] },
        { title: 'group 4', items: ['0'] },
    ]

    return (
        <div className="App">
            <DragNDrop data={data} />

            {/* 
            <div className="box-container">
                <div className="box-group">
                    <p className="group-title">group name</p>
                    <div className="box-items">
                        <p>items</p>
                    </div>
                    <div className="box-items">
                        <p>items</p>
                    </div>
                </div>
                <div className="box-group">
                    <p>group name</p>
                    <div className="box-items">
                        <p>items</p>
                    </div>
                    <div className="box-items">
                        <p>items</p>
                    </div>
                </div>
                <div className="box-group"></div>
            </div> */}
        </div>
    )
}

export default App
