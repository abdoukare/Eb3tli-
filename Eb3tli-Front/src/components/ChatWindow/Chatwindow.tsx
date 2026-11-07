import ChatPlaceholder from "./ChatPlaceholder";

const ChatWindow: React.FC = () => {
    return (
        <main className="flex min-h-screen flex-1 flex-col bg-white">
            <div className="flex flex-1 items-center justify-center p-4 text-sm text-gray-500">
                <ChatPlaceholder />
            </div>
        </main>
    );
};

export default ChatWindow;
