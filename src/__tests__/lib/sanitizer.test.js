import {
  escapeHtml,
  sanitizeInput,
  sanitizeEmail,
  sanitizePhone,
  sanitizeName,
  sanitizeText,
  sanitizeUrl,
  sanitizeObject,
  authFormSanitizer,
  profileFormSanitizer
} from '../../lib/sanitizer';

describe('Sanitizer', () => {
  describe('escapeHtml', () => {
    it('escapes HTML entities', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
      expect(escapeHtml("It's a test")).toBe('It&#39;s a test');
    });

    it('returns non-string values unchanged', () => {
      expect(escapeHtml(123)).toBe(123);
      expect(escapeHtml(null)).toBe(null);
      expect(escapeHtml(undefined)).toBe(undefined);
    });
  });

  describe('sanitizeInput', () => {
    it('removes script tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('Hello');
      expect(sanitizeInput('Hello<script src="evil.js"></script>World')).toBe('HelloWorld');
    });

    it('removes event handlers', () => {
      expect(sanitizeInput('<div onclick="alert(1)">Click</div>')).toBe('&lt;div&gt;Click&lt;&#x2F;div&gt;');
      expect(sanitizeInput('<img onerror="alert(1)" src="x">')).toBe('&lt;img src=&quot;x&quot;&gt;');
    });

    it('removes javascript: protocol', () => {
      expect(sanitizeInput('<a href="javascript:alert(1)">Link</a>')).toBe('&lt;a href=&quot;alert(1)&quot;&gt;Link&lt;&#x2F;a&gt;');
    });

    it('handles normal text', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World');
      expect(sanitizeInput('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });
  });

  describe('sanitizeEmail', () => {
    it('validates and sanitizes email', () => {
      expect(sanitizeEmail('test@example.com')).toBe('test@example.com');
      expect(sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
      expect(sanitizeEmail(' test@example.com ')).toBe('test@example.com');
    });

    it('returns empty string for invalid emails', () => {
      expect(sanitizeEmail('notanemail')).toBe('');
      expect(sanitizeEmail('test@')).toBe('');
      expect(sanitizeEmail('@example.com')).toBe('');
    });

    it('removes dangerous characters', () => {
      expect(sanitizeEmail('test<script>@example.com')).toBe('testscript@example.com');
      expect(sanitizeEmail('test"quote"@example.com')).toBe('testquote@example.com');
      expect(sanitizeEmail("test'@example.com")).toBe('test@example.com');
    });

    it('handles non-string inputs', () => {
      expect(sanitizeEmail(null)).toBe('');
      expect(sanitizeEmail(undefined)).toBe('');
      expect(sanitizeEmail(123)).toBe('');
    });
  });

  describe('sanitizePhone', () => {
    it('sanitizes phone numbers', () => {
      expect(sanitizePhone('+1-234-567-8900')).toBe('+1-234-567-8900');
      expect(sanitizePhone('(123) 456-7890')).toBe('(123) 456-7890');
      expect(sanitizePhone('123.456.7890')).toBe('1234567890');
    });

    it('removes non-numeric characters except allowed ones', () => {
      expect(sanitizePhone('123-456-7890 ext 123')).toBe('123-456-7890  123');
      expect(sanitizePhone('<script>123</script>')).toBe('123');
    });

    it('handles non-string inputs', () => {
      expect(sanitizePhone(null)).toBe('');
      expect(sanitizePhone(undefined)).toBe('');
    });
  });

  describe('sanitizeName', () => {
    it('sanitizes names', () => {
      expect(sanitizeName('John Doe')).toBe('John Doe');
      expect(sanitizeName("O'Connor")).toBe("O'Connor");
      expect(sanitizeName('Mary-Jane')).toBe('Mary-Jane');
    });

    it('removes invalid characters', () => {
      expect(sanitizeName('John123')).toBe('John');
      expect(sanitizeName('John<script>alert</script>')).toBe('Johnalert');
      expect(sanitizeName('John@Doe')).toBe('JohnDoe');
    });

    it('trims whitespace', () => {
      expect(sanitizeName('  John  ')).toBe('John');
    });

    it('limits length', () => {
      const longName = 'a'.repeat(150);
      expect(sanitizeName(longName).length).toBe(100);
    });
  });

  describe('sanitizeText', () => {
    it('sanitizes text with default length', () => {
      expect(sanitizeText('Hello World')).toBe('Hello World');
      expect(sanitizeText('<b>Bold</b>')).toBe('&lt;b&gt;Bold&lt;&#x2F;b&gt;');
    });

    it('removes null bytes', () => {
      expect(sanitizeText('Hello\0World')).toBe('HelloWorld');
    });

    it('respects max length', () => {
      expect(sanitizeText('Hello World', 5)).toBe('Hello');
    });

    it('trims whitespace', () => {
      expect(sanitizeText('  Hello  ')).toBe('Hello');
    });
  });

  describe('sanitizeUrl', () => {
    it('validates and sanitizes URLs', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
      expect(sanitizeUrl('http://example.com/path?query=1')).toBe('http://example.com/path?query=1');
    });

    it('rejects invalid protocols', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBe('');
      expect(sanitizeUrl('file:///etc/passwd')).toBe('');
      expect(sanitizeUrl('ftp://example.com')).toBe('');
    });

    it('handles invalid URLs', () => {
      expect(sanitizeUrl('not a url')).toBe('');
      expect(sanitizeUrl('')).toBe('');
    });
  });

  describe('sanitizeObject', () => {
    it('sanitizes object recursively', () => {
      const input = {
        name: '<script>John</script>',
        email: 'test@example.com',
        nested: {
          description: 'Hello<script>alert</script>World'
        }
      };

      const result = sanitizeObject(input);
      expect(result.name).toBe('&lt;script&gt;John&lt;&#x2F;script&gt;');
      expect(result.email).toBe('test@example.com');
      expect(result.nested.description).toBe('Hello&lt;script&gt;alert&lt;&#x2F;script&gt;World');
    });

    it('applies custom sanitizers', () => {
      const input = {
        email: 'TEST@EXAMPLE.COM',
        name: 'John123',
        other: 'unchanged'
      };

      const result = sanitizeObject(input, {
        email: sanitizeEmail,
        name: sanitizeName
      });

      expect(result.email).toBe('test@example.com');
      expect(result.name).toBe('John');
      expect(result.other).toBe('unchanged');
    });

    it('handles arrays', () => {
      const input = ['<script>test</script>', 'normal'];
      const result = sanitizeObject(input);
      expect(result[0]).toBe('&lt;script&gt;test&lt;&#x2F;script&gt;');
      expect(result[1]).toBe('normal');
    });
  });

  describe('Form sanitizers', () => {
    it('authFormSanitizer sanitizes auth form data', () => {
      const formData = {
        email: 'TEST@EXAMPLE.COM  ',
        password: 'MyP@ssw0rd!',
        firstName: 'John<script>',
        lastName: "O'Connor123",
        phone: '+1-234-567-8900'
      };

      const result = authFormSanitizer(formData);

      expect(result.email).toBe('test@example.com');
      expect(result.password).toBe('MyP@ssw0rd!'); // Password unchanged
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe("O'Connor");
      expect(result.phone).toBe('+1-234-567-8900');
    });

    it('profileFormSanitizer sanitizes profile form data', () => {
      const formData = {
        firstName: '  Jane  ',
        lastName: 'Doe-Smith',
        phone: '(555) 123-4567',
        bio: 'I am a <b>developer</b>',
        website: 'https://example.com/profile'
      };

      const result = profileFormSanitizer(formData);

      expect(result.firstName).toBe('Jane');
      expect(result.lastName).toBe('Doe-Smith');
      expect(result.phone).toBe('(555) 123-4567');
      expect(result.bio).toBe('I am a &lt;b&gt;developer&lt;&#x2F;b&gt;');
      expect(result.website).toBe('https://example.com/profile');
    });
  });
});