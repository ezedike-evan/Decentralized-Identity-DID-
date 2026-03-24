import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Lightbulb,
  BugReport,
  Info
} from '@mui/icons-material';

const ErrorDisplay = ({ error, onClose, severity = 'error' }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!error) return null;
  
  const errorInfo = error;
  const hasSuggestions = errorInfo.suggestions && errorInfo.suggestions.length > 0;
  const hasTechnicalDetails = errorInfo.technicalDetails;
  
  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{ mb: 2 }}
      action={
        <Box>
          {hasSuggestions && (
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              aria-label="Show suggestions"
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>
      }
    >
      <AlertTitle>{errorInfo.title || 'Error'}</AlertTitle>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {errorInfo.message || 'An error occurred'}
      </Typography>
      
      <Collapse in={expanded}>
        {hasSuggestions && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Lightbulb sx={{ mr: 1, fontSize: 16, color: 'warning.main' }} />
              <Typography variant="subtitle2" fontWeight="bold">
                What you can do:
              </Typography>
            </Box>
            <List dense sx={{ pl: 2 }}>
              {errorInfo.suggestions.map((suggestion, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        • {suggestion}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {hasTechnicalDetails && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BugReport sx={{ mr: 1, fontSize: 16, color: 'info.main' }} />
              <Typography variant="subtitle2" fontWeight="bold">
                Technical Details:
              </Typography>
            </Box>
            
            {errorInfo.technicalDetails.code && (
              <Box sx={{ mb: 1 }}>
                <Chip 
                  label={`Code: ${errorInfo.technicalDetails.code}`}
                  size="small"
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
              </Box>
            )}
            
            {errorInfo.technicalDetails.originalMessage && (
              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {errorInfo.technicalDetails.originalMessage}
              </Typography>
            )}
            
            {errorInfo.technicalDetails.stack && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
                  {errorInfo.technicalDetails.stack}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Collapse>
    </Alert>
  );
};

export default ErrorDisplay;
