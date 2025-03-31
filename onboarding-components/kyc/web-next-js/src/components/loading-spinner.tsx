const LoadingSpinner = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
		</div>
	);
};

export default LoadingSpinner;
