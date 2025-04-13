import { useState } from "react";

const useProcesModal = ({ process }) => {
    const [error, setError] = useState("");
    const [border, setBorder] = useState("#ffffff25");
    const [title, setTitle] = useState(process?.title || "");
    const [priority, setPriority] = useState(process?.priority || 0);
    const [starred, setStarred] = useState(process?.starred || false);
    const [schedule, setSchedule] = useState(process?.schedule || false);
    const [completed, setCompleted] = useState(process?.completed || false);
    const [assignedTo, setAssignedTo] = useState(process?.assignedTo || null);
    const [description, setDescription] = useState(process?.description || "");
    const [showDeadline, setShowDeadline] = useState(process?.showDeadline || false);
    const [endsAt, setEndsAt] = useState(process?.endsAt && new Date(process.endsAt) || null);
    const [color, setColor] = useState(process?.color || { hex: "#C2D6EB", name: "Light blue" });
    const [startsAt, setStartsAt] = useState(process?.startsAt && new Date(process.startsAt) || null);
    const [deadline, setDeadline] = useState(process?.deadline && new Date(process.deadline) || new Date());

    return {
        error,
        setError,
        border,
        setBorder,
        title,
        setTitle,
        priority,
        setPriority,
        starred,
        setStarred,
        schedule,
        setSchedule,
        completed,
        setCompleted,
        assignedTo,
        setAssignedTo,
        description,
        setDescription,
        showDeadline,
        setShowDeadline,
        endsAt,
        setEndsAt,
        color,
        setColor,
        startsAt,
        setStartsAt,
        deadline,
        setDeadline
    };
};

export default useProcesModal;