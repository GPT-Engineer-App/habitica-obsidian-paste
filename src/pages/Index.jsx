// Complete the Index page component here
// Use chakra-ui
import { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack, Textarea, useClipboard, useToast } from "@chakra-ui/react";
import { FaCopy, FaDownload } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [formattedText, setFormattedText] = useState("");
  const { hasCopied, onCopy } = useClipboard(formattedText);
  const toast = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://habitica.com/api/v3/tasks/user", {
        headers: {
          "x-api-user": "your-user-id",
          "x-api-key": "your-api-key",
        },
      });
      const data = await response.json();
      setTasks(data.data);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const formatTasks = () => {
      const formatted = tasks.map((task) => `- [ ] ${task.text}`).join("\n");
      setFormattedText(formatted);
    };

    if (tasks.length > 0) {
      formatTasks();
    }
  }, [tasks]);

  const handleCopySuccess = () => {
    toast({
      title: "Copied to clipboard",
      description: "You've copied the formatted tasks to your clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl">
          Habitica Tasks to Obsidian
        </Heading>
        <Text>Below are your tasks from Habitica formatted for Obsidian. Click the copy button to copy them to your clipboard.</Text>
        <Textarea value={formattedText} isReadOnly placeholder="Your tasks will appear here..." />
        <Button
          leftIcon={<FaCopy />}
          colorScheme="teal"
          onClick={() => {
            onCopy();
            handleCopySuccess();
          }}
        >
          {hasCopied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
