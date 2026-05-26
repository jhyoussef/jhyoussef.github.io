require "json"
require "pathname"

gallery_dir = Pathname.new(__dir__).join("gallery")
manifest_path = Pathname.new(__dir__).join("gallery.json")
image_extensions = [".gif", ".jpeg", ".jpg", ".png", ".webp"]
current_year = Time.now.year

def title_from_filename(filename)
  cleaned = filename
    .sub(/\.[^.]+\z/, "")
    .gsub(/[._-]+/, " ")
    .gsub(/\s+/, " ")
    .gsub(/\b(edited|reduced|resized|horizontal)\b/i, "")
    .gsub(/\s+/, " ")
    .strip

  cleaned.gsub(/\b\w/) { |letter| letter.upcase }
end

def default_entry(filename, current_year)
  title = title_from_filename(filename)
  title = filename if title.empty?

  {
    "filename" => filename,
    "title" => title,
    "year" => current_year,
    "medium" => "",
    "alt" => "#{title} artwork.",
    "caption" => "",
    "tags" => [],
    "show" => true,
    "featured" => false,
  }
end

def read_manifest(manifest_path)
  return [] unless manifest_path.file?

  parsed = JSON.parse(manifest_path.read)
  raise "#{manifest_path} must contain a JSON array." unless parsed.is_a?(Array)

  parsed
end

filenames = gallery_dir.children
  .select { |entry| entry.file? && image_extensions.include?(entry.extname.downcase) }
  .map { |entry| entry.basename.to_s }
  .sort_by(&:downcase)

files = filenames.to_h { |filename| [filename, true] }
existing_entries = read_manifest(manifest_path).select { |entry| entry.is_a?(Hash) && entry["filename"] }
existing_by_filename = existing_entries.to_h { |entry| [entry["filename"], entry] }
stale_entries = existing_entries.reject { |entry| files[entry["filename"]] }

synced_entries = filenames.map do |filename|
  default_entry(filename, current_year).merge(existing_by_filename.fetch(filename, {})).tap do |entry|
    entry["tags"] = [] unless entry["tags"].is_a?(Array)
    entry["show"] = true unless entry.key?("show")
    entry["featured"] = false unless entry.key?("featured")
  end
end

manifest_path.write("#{JSON.pretty_generate(synced_entries)}\n")

puts "Synced #{synced_entries.length} gallery item#{synced_entries.length == 1 ? "" : "s"} to #{manifest_path.relative_path_from(Pathname.new(Dir.pwd))}."

unless stale_entries.empty?
  filenames = stale_entries.map { |entry| entry["filename"] }.join(", ")
  warn "Ignored #{stale_entries.length} stale manifest entr#{stale_entries.length == 1 ? "y" : "ies"}: #{filenames}"
end
