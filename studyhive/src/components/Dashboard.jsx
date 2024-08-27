import React, { useState } from 'react';
import Navbar from './NavBar';
import '../Dashboard.css'

function Dashboard() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [newClassName, setNewClassName] = useState('');
    const [newFolderName, setNewFolderName] = useState('');

    const addClass = () => {
        if (newClassName.trim()) {
            const newClass = { id: Date.now(), name: newClassName, folders: [] };
            setClasses([...classes, newClass]);
            setNewClassName('');
        }
    };

    const selectClass = (classId) => {
        setSelectedClass(classId);
    };

    const addFolder = (classId) => {
        if (newFolderName.trim()) {
            const updatedClasses = classes.map(cls => {
                if (cls.id === classId) {
                    const newFolder = { id: Date.now(), name: newFolderName, files: [] };
                    return { ...cls, folders: [...cls.folders, newFolder] };
                }
                return cls;
            });
            setClasses(updatedClasses);
            setNewFolderName('');
        }
    };

    const handleFileUpload = (classId, folderId, event) => {
        const file = event.target.files[0];
        if (file) {
            const updatedClasses = classes.map(cls => {
                if (cls.id === classId) {
                    const updatedFolders = cls.folders.map(folder => {
                        if (folder.id === folderId) {
                            return { ...folder, files: [...folder.files, file] };
                        }
                        return folder;
                    });
                    return { ...cls, folders: updatedFolders };
                }
                return cls;
            });
            setClasses(updatedClasses);
        }
    };

    return (
        <div className="Dashboard">
            <Navbar />
            <div className="add-class-container">
                <input
                    type="text"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="Class Name"
                    className="input"
                />
                <button onClick={addClass} className="add-button">+</button>
            </div>
            <div className="classes">
                {classes.map(cls => (
                    <div key={cls.id} className="class">
                        <h2 onClick={() => selectClass(cls.id)} className="class-name">{cls.name}</h2>
                        {selectedClass === cls.id && (
                            <div className="folders">
                                <div className="add-folder-container">
                                    <input
                                        type="text"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="Folder Name"
                                        className="input"
                                    />
                                    <button onClick={() => addFolder(cls.id)} className="add-button">+</button>
                                </div>
                                {cls.folders.map(folder => (
                                    <div key={folder.id} className="folder">
                                        <h3>{folder.name}</h3>
                                        <input type="file" onChange={(e) => handleFileUpload(cls.id, folder.id, e)} />
                                        <ul>
                                            {folder.files.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;