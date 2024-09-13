import Section from "./section/Section";

function DashBoard() {
  return (
    <div className="flex h-full overflow-x-scroll w-fit">
      <Section 
        name = 'Ready'
        count = {10}
        color = '#fde047'
      />

      <Section 
        name = 'Running'
        count = {2}
        color = '#2563eb'
      />

      <Section 
        name = 'CPU'
        count = {1}
        color = '#a855f7'
      />

      <Section 
        name = 'Blocked'
        count = {3}
        color = '#16a34a'
      />

      <Section 
        name = 'Completed'
        count = {2}
        color = '#047857'
      />

      <Section 
        name = 'Terminated'
        count = {2}
        color = '#374151'
      />
    </div>
  );
}

export default DashBoard;
