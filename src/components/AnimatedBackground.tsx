// Animated background with floating particles and gradient blobs
export default function AnimatedBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Colorful Blobs - Gold / Amber Theme */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] animate-float" />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] animate-float"
                style={{ animationDelay: '2s' }}
            />
            <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[90px] animate-pulse-slow" />
            <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="particle absolute bg-gold/40 rounded-full"
                    style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                    }}
                />
            ))}
        </div>
    );
}
