interface PageHeaderProps {
  title: string;
  description: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground italic">{description}</p>
    </div>
  );
}

export default PageHeader;
