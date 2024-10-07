export function User({ addedClass="" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
      className={`rounded-full bg-[#d77f38] p-0.5 ${addedClass}`}>
      <path d="M6 21L7.5 15M18 21L16.5 15M16.5 15L14 5C14 5 13.5 3 12 3C10.5 3 10 5 10 5L7.5 15M16.5 15H7.5" 
        stroke="#ffffff" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Rocket({ className="" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={className}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
    );
}

export function SearchIcon({  className="" }){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={className}>
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    )
}

export function Timeline({ stroke = "#000", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 93 96"
      stroke={stroke}
      strokeWidth="6"
      fill="none">
      <rect x="1.5" y="9.5" width="75" height="19" rx="4.5" />
      <rect x="16.5" y="69.5" width="75" height="19" rx="4.5" />
      <rect x="31.5" y="39.5" width="54" height="19" rx="4.5" />
      <path d="M52.25 1.99669L52.25 93.9967" strokeLinecap="round" />
    </svg>
  );
}

export function Team({ stroke = "#000", className="" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      stroke={stroke}
      className={className}
      viewBox="0 0 24 24">
      <path d="m17.979,23.359c.078.265-.073.542-.339.62-.047.014-.094.021-.141.021-.217,0-.416-.141-.479-.359-.631-2.144-2.695-3.641-5.021-3.641s-4.39,1.497-5.021,3.641c-.077.266-.357.416-.62.339-.266-.078-.417-.355-.339-.62.754-2.567,3.213-4.359,5.979-4.359s5.226,1.792,5.979,4.359Zm6-9c-.754-2.567-3.213-4.359-5.979-4.359-.276,0-.5.224-.5.5s.224.5.5.5c2.325,0,4.39,1.497,5.021,3.641.063.219.263.359.479.359.047,0,.094-.007.141-.021.266-.078.417-.355.339-.62Zm-17.479-3.859c0-.276-.224-.5-.5-.5C3.233,10,.774,11.792.021,14.359c-.078.265.073.542.339.62.047.014.094.021.141.021.217,0,.416-.141.479-.359.631-2.144,2.695-3.641,5.021-3.641.276,0,.5-.224.5-.5Zm5.5-1.5c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm-3,4c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Zm5-9c0-2.206,1.794-4,4-4s4,1.794,4,4-1.794,4-4,4-4-1.794-4-4Zm1,0c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Zm-13,0C2,1.794,3.794,0,6,0s4,1.794,4,4-1.794,4-4,4-4-1.794-4-4Zm1,0c0,1.654,1.346,3,3,3s3-1.346,3-3-1.346-3-3-3-3,1.346-3,3Z"/>
    </svg>
  );
}

export function Del({ stroke = "#f10000", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function Copy({ stroke = "#000", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function Archive({ stroke = "#000", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function Close({ stroke = "#000", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function Complete({ stroke = "#0ed100", width = "24", height = "24", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

export function Calander({ stroke = "#71717a", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

export function Tags({ stroke = "#71717a", width = "24", height = "24" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
    </svg>
  );
}

export function AddTask({ stroke = "#3f3f46", width = "24", height = "24", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

export function Plus({ stroke = "#71717f", width = "24", height = "24", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function CurrentProject({ stroke = "white", width = "24", height = "24", className = "" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    );
}

export function ChevronDown({ stroke = "#71717a", width = "24", height = "24", className = "" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
}

export function DefaultPriority({ stroke = "#000", width = "24", height = "100%", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <circle cx="12" cy="20" r="2" />
      <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export function Priority1({ fill = "#FF0000", width = "24", height = "100%", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill="none"
      className={className}
    >
      <circle cx="7" cy="19" r="2" fill={fill} />
      <path d="M7 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={fill} />
      <circle cx="12" cy="19" r="2" fill={fill} />
      <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={fill} />
      <circle cx="17" cy="19" r="2" fill={fill} />
      <path d="M17 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={fill} />
    </svg>
  );
}

export function Priority2({ fill = "#FFA500", width = "24", height = "100%", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill="none"
      className={className}
    >
      <circle cx="9" cy="19" r="2" fill={fill} />
      <path d="M9 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={fill} />
      <circle cx="15" cy="19" r="2" fill={fill} />
      <path d="M15 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={fill} />
    </svg>
  );
}

export function Priority3({ fill = "#28a745", width = "24", height = "100%", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill="none"
      className={className}
    >
      <circle cx="12" cy="19" r="2" fill={fill} />
      <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z" fill={fill} />
    </svg>
  );
}

export function Sun({ stroke="#ffffff", className= "" }){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={stroke} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      class={className}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/><path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  );
}

export function Star({ stroke="#ffffff", className="" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={stroke} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      class={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

export function NewSectionIcon({ stroke = "#f1f1f1", className = "" }) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <path d="M11 12H3" />
        <path d="M16 6H3" />
        <path d="M16 18H3" />
        <path d="M18 9v6" />
        <path d="M21 12h-6" />
    </svg>
  );
}

export function ReadySectionIcon({ stroke = "#f1f1f1", className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}>
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
    );
}

export function RunningSectionIcon({ stroke = "#f1f1f1", className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}>
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
        </svg>
    )
}

export function BlockedSectionIcon({ stroke = "#f1f1f1", className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}>
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
        </svg>
    )
}

export function TerminatedSectionIcon({ stroke = "#f1f1f1", className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}>
            <path d="M18 6 7 17l-5-5" />
            <path d="m22 10-7.5 7.5L13 16" />
        </svg>
    )
}

export const priorityIcons = [Priority1, Priority2, Priority3, DefaultPriority];
export const modalIcons = {Timeline, User, Copy, Del, Archive, Close, Complete, Calander, Tags, ChevronDown};
export const navIcons = {Timeline, Team, AddTask, CurrentProject, ChevronDown};
export const taskIcons = {User, AddTask, Plus};
export const headerIcons = {NewSectionIcon, ReadySectionIcon, RunningSectionIcon, BlockedSectionIcon, TerminatedSectionIcon};
export const ActivityBarIcons = {User, SearchIcon, Rocket, Sun, Star, Timeline, Complete};