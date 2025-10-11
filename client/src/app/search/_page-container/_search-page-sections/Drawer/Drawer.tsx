import React, { useEffect } from 'react';

const DrawerPage = ({
  onClose,
  isOpen,
  children,
}: {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Drawer Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        {/* Drawer Header */}
        <div className="border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center space-x-4">
            {children}
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-auto p-4">
          {/* Add your drawer body content here */}
        </div>
      </div>
    </>
  );
};

// Example usage component
const ExampleUsage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Open Drawer
      </button>

      <DrawerPage
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <h2 className="text-xl font-semibold">Drawer Title</h2>
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="ml-auto text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </DrawerPage>
    </div>
  );
};

export default ExampleUsage;